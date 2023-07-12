import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginEntryComponent } from './login-entry.component';
import { LoginContainerComponent } from './components/container/LoginContainer/login-container.component';
import { LoginContentComponent } from './components/presentational/LoginContent/login-content.component';

@NgModule({
    imports: [SharedModule, LoginRoutingModule],
    declarations: [LoginContainerComponent, LoginContentComponent, LoginEntryComponent],
})
export class LoginModule {}
