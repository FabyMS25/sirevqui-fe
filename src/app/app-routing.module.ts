import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StaffComponent } from './pages/modules/staff/staff.component';

const routes: Routes = [
  /* MODULES */
  {
      path: '',
      component: LayoutComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
          {path: '', component: DashboardComponent},
          {path: 'auth/profile', component: ProfileComponent,data: { requiredPermission: 'CAN_ACCESS' },},
          {path: 'auth/profile-setting', component: SettingsComponent,data: { requiredPermission: 'CAN_ACCESS' },},
      ]
  },
  {
    path: 'staff',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [ 
      { path: '', component: StaffComponent},
    ]
  },
  {
    path: 'settings',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [ 
      // { path: 'equipments', component: EquipmentsComponent},
    ]
  },

    {
      path: 'ecommerce', 
      component: LayoutComponent,
      loadChildren: () => import('./pages/_examples/ecommerce/ecommerce.module').then(m => m.EcommerceModule)
    },
    {
      path: 'tasks', 
      component: LayoutComponent,
      loadChildren: () => import('./pages/_examples/tasks/tasks.module').then(m => m.TasksModule)
    },
    {
      path: 'crypto', 
      component: LayoutComponent,
      loadChildren: () => import('./pages/_examples/crypto/crypto.module').then(m => m.CryptoModule)
    },
    {
      path: 'invoices', 
      component: LayoutComponent,
      loadChildren: () => import('./pages/_examples/invoices/invoices.module').then(m => m.InvoicesModule)
    },
    {
      path: 'tickets', 
      component: LayoutComponent,
      loadChildren: () => import('./pages/_examples/tickets/tickets.module').then(m => m.TicketsModule)
    },
    {
      path: 'marletplace', 
      component: LayoutComponent,
      loadChildren: () => import('./pages/_examples/nft-marketplace/nft-marketplace.module').then(m => m.NftMarketplaceModule)
    },
    {
      path: 'charts', 
      component: LayoutComponent,
      loadChildren: () => import('./pages/_examples/charts/charts.module').then(m => m.ChartsModule)
    },
  
  /*EXTRA PAGES  */
  {
    path: 'pages',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { requiredPermission: 'CAN_ACCESS' },
    children: [
      { path: '', loadChildren: () => import('./pages/extrapages/extraspages.module').then(m => m.ExtraspagesModule), },
    ]
  },
  /* PUBLIC ACCES */
  // { path: 'landing', loadChildren: () => import('./public/landing/landing.module').then(m => m.LandingModule)},  
  {
    path: 'auth',
    canActivate: [NoAuthGuard], 
    loadChildren: () => import('./public/account/account.module').then(m => m.AccountModule),
  },
  { path: 'public', loadChildren: () => import('./public/extraspages/extraspages.module').then(m => m.ExtraspagesModule) },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
