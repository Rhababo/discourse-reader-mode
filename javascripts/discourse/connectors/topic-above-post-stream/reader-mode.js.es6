import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as controller } from "@ember/controller";
import Service, { inject as service } from "@ember/service";
import DiscourseURL from "discourse/lib/url";
//import SidebarCloser from "../../components/close-sidebar";
//import FilterTopicOwnerPosts from "../../components/filter-topic-owner-posts";

export default class readerMode extends Component {

    @controller topic
    @controller application
    @service site

    topicOwnerUsername = this.topic.model.details.created_by.username;
    isReaderTopic = this.topic.model.tags.includes(settings.reader_tag) || this.topic.model.category.name.toLowerCase() == settings.reader_category.toLowerCase();
    readerModeActive = false;
    postStream = this.topic.model.postStream;


    @action
    activateReaderMode(){
        if(this.application.showSidebar||this.readerModeActive){
            if(this.application.sidebarEnabled){
                this.application.toggleSidebar();
            }
        }
        if(this.postStream.userFilters.length > 0){
            this.postStream.cancelFilter();
        }
        else{
            this.filterPosts();
            this.readerModeActive = true;


        }
    }
    async filterPosts() {
        const topicController = this.topic;
        const topicOwnerUser = topicController.model.details.created_by;
        await topicController.send("filterParticipant", topicOwnerUser);
        await this.delay(100);

        DiscourseURL.jumpToPost(1, {anchor: true});
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
