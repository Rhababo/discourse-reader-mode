import { inject as controller } from "@ember/controller";
import {}
import { action } from "@ember/object";

export default class sidebarCloser extends Component {
    @controller application;

    @action
    closeSidebar()
    {
        const applicationController = this.application;
        if(applicationController.showSidebar){
            applicationController.toggleSidebar();
        }
    }
}
