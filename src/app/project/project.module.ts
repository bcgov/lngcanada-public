import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from 'app/shared.module';

// Components
import { ProjectComponent } from 'app/project/project.component';
import { OverviewComponent } from './overview/overview.component';
import { BackgroundComponent } from './background/background.component';
import { AuthorizationsComponent } from './authorizations/authorizations.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { NationsComponent } from './nations/nations.component';
import { PlansComponent } from './plans/plans.component';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule.forRoot(), RouterModule, SharedModule],
  declarations: [
    ProjectComponent,
    OverviewComponent,
    BackgroundComponent,
    AuthorizationsComponent,
    ComplianceComponent,
    NationsComponent,
    PlansComponent,
    MapComponent
  ],
  entryComponents: []
})
export class ProjectModule {}
