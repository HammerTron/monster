import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginContainerComponent } from './components/container/LoginContainer/login-container.component';
import { LoginEntryComponent } from './login-entry.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: '/Login',
                pathMatch: 'full',
            },
            {
                path: '',
                component: LoginEntryComponent,
                children: [
                    {
                        path: 'Login',
                        component: LoginContainerComponent,
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class LoginRoutingModule {}
