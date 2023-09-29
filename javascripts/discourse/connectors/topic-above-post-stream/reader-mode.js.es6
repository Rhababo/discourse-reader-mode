import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as controller } from "@ember/controller";
import Service, { inject as service } from "@ember/service";
//import SidebarCloser from "../../components/close-sidebar";
//import FilterTopicOwnerPosts from "../../components/filter-topic-owner-posts";

export default class readerMode extends Component {

    @controller topic
    @controller application
    @service site

    topicOwnerUsername = this.topic.model.details.created_by.username;
    isReaderTopic = this.topic.model.tags.includes(settings.reader_tag) || this.topic.model.category.name.toLowerCase() == settings.reader_category.toLowerCase();

    @action
    activateReaderMode(){
        const siteService = this.site;
        console.log(siteService);
        console.log(this.args);
        if(this.application.showSidebar){
            this.application.toggleSidebar();
        }

        this.filterPosts();
       // const filterComponent = new FilterTopicOwnerPosts({owner: this.owner, args: this.args});
        //const sidebarComponent = new SidebarCloser();
        //filterComponent.filterPosts();
       // sidebarComponent.closeSidebar();
    }
    filterPosts() {
        const topicController = this.topic;
        //const postStream = topicController.model.postStream;
        const topicOwnerUser = topicController.model.details.created_by;
        topicController.send("filterParticipant", topicOwnerUser);
        console.log(this);
    }

}
