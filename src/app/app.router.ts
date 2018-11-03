import { HomeComponent } from "./home/home.component";
import { FormComponent } from "./form/form.component";
import { ListFormComponent } from "./list-form/list-form.component";

export const routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'form',
        component: FormComponent
    },
    {
        path: 'list-form',
        component: ListFormComponent
    }
];
