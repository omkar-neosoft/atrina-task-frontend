import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { AgentComponent } from './components/agent/agent.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
];
