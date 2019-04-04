import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from 'app/about/about.component';
import { ContactComponent } from 'app/contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProcessComponent } from './process/process.component';
import { LngComponent } from './lng/lng.component';
import { ProjectComponent } from './project/project.component';
import { OverviewComponent } from './project/overview/overview.component';
import { BackgroundComponent } from './project/background/background.component';
import { AuthorizationsComponent } from './project/authorizations/authorizations.component';
import { ComplianceComponent } from './project/compliance/compliance.component';
import { NationsComponent } from './project/nations/nations.component';
import { PlansComponent } from './project/plans/plans.component';
import { MapComponent } from './project/map/map.component';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'background', component: BackgroundComponent },
      { path: 'authorizations', component: AuthorizationsComponent },
      { path: 'compliance', component: ComplianceComponent },
      { path: 'nations', component: NationsComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'map', component: MapComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview' }
    ]
  },
  {
    path: 'process',
    component: ProcessComponent
  },
  {
    path: 'lng',
    component: LngComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'connect',
    component: ContactComponent
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'projects'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
