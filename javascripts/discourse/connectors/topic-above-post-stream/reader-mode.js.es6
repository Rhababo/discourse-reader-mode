import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as controller } from "@ember/controller";
import DiscourseURL from "discourse/lib/url";

export default class readerMode extends Component {

    @controller topic
    @controller application

    topicOwnerUsername = this.topic.model.details.created_by.username;
    isReaderTopic = this.topic.model.tags.includes(settings.reader_tag) || this.topic.model.category.name.toLowerCase() == settings.reader_category.toLowerCase();
    readerModeActive = false;
    postStream = this.topic.model.postStream;


    isReaderModeActive(){
        return !(this.application.showSidebar || this.postStream.userFilters.length == 0);
    }

    @action
    toggleReaderMode(){
        this.readerModeActive = this.isReaderModeActive();
        if(!this.readerModeActive){
            this.activateReaderMode();
        } else {
            this.deactivateReaderMode();
            this.readerModeActive = false;
        }
    }
    @action
    activateReaderMode(){
        if(this.application.showSidebar){
            this.application.toggleSidebar();
        }
        this.filterPosts();
        this.readerModeActive = true;
    }

    @action
    deactivateReaderMode(){
        if (this.application.sidebarEnabled && !this.application.showSidebar){
            this.application.toggleSidebar();
        }
        if(this.postStream.userFilters.length > 0) {
            this.postStream.cancelFilter();
        }
        this.readerModeActive = false;
    }

    async filterPosts() {
        const topicController = this.topic;
        const topicOwnerUser = topicController.model.details.created_by;
        await topicController.send("filterParticipant", topicOwnerUser);
        await this.delay(1000);

        DiscourseURL.jumpToPost(1);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
