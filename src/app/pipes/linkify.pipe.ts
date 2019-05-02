import { Pipe, PipeTransform } from '@angular/core';
import LinkifyIt from 'linkify-it';

/**
 * Finds standard urls and relative url patterns and replaces them with anchor tags.
 *
 * Standard urls:
 * "This is a string with a https://www.regular-url.com in it."
 * "This is a string with a <a href="https://www.regular-url.com" target="_blank">www.regular-url.com</a> in it."
 *
 * Relative urls:
 * "This is a string with a [relative url](/project/123/documents) in it."
 * "This is a string with a <a href="http://localhost:4300/project/123/documents" target="_blank">relative url</a> in it."
 *
 * @export
 * @class LinkifyPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'linkify' })
export class LinkifyPipe implements PipeTransform {
  transform(str: string | string[]): string | string[] {
    if (!str) {
      return '';
    }

    if (typeof str === 'string') {
      return this.linkifyString(str);
    }

    return this.linkifyStringArray(str);
  }

  /**
   * Linkify's a single string.
   *
   * @private
   * @param {string} str
   * @returns {string}
   * @memberof LinkifyPipe
   */
  private linkifyString(str: string): string {
    return this.convertRelativeURLs(this.convertStandardURLs(str));
  }

  /**
   * Linkify's an array of strings.
   *
   * @private
   * @param {string[]} str
   * @returns {string[]}
   * @memberof LinkifyPipe
   */
  private linkifyStringArray(str: string[]): string[] {
    const newStringArray: string[] = [];

    str.forEach(line => {
      newStringArray.push(this.convertRelativeURLs(this.convertStandardURLs(line)));
    });

    return newStringArray;
  }

  /**
   * Finds and converts all standard urls to anchor tags.
   *
   * @private
   * @returns {string}
   * @memberof LinkifyPipe
   */
  private convertStandardURLs(str: string): string {
    const linkify = LinkifyIt();

    const matches = linkify.match(str);

    if (matches) {
      matches.forEach(match => {
        str = str.replace(match.text, `<a href="${match.url}" target="_blank">${match.text}</a>`);
      });
    }

    return str;
  }

  /**
   * Finds and convert all relative urls to anchor tags.
   * These relative urls are specified/found using a regex pattern: [LinkName](RelativeURL)
   *
   * @private
   * @param {string} str
   * @returns {string}
   * @memberof LinkifyPipe
   */
  private convertRelativeURLs(str: string): string {
    const match = str.match(/\[(.*)\]\((.*)\)/);

    if (match) {
      const url = new URL(match[2], window.location.origin);
      str = str.replace(match[0], `<a href="${url.href}" target="_blank">${match[1]}</a>`);
    }

    return str;
  }
}
