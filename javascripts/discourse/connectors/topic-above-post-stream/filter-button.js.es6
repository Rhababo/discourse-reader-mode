import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { inject as controller } from "@ember/controller";
import { action } from "@ember/object";
//import DiscourseURL from "discourse/lib/url";
//import I18n from "I18n";
//import discourseComputed from "discourse-common/utils/decorators";
//import User from "discourse/models/user";

export default class filterTopicOwnerPosts extends Component {
    @controller topic;

    topicOwnerUsername = this.topic.model.details.created_by.username;
    isReaderTopic = this.topic.model.tags.includes(settings.reader_tag) || this.topic.model.category.name.toLowerCase() == settings.reader_category.toLowerCase();

    /*@action
    readerMode(){
        this.filterPosts();
        this.closeSidebar();
    }

    @action
    closeSidebar(){


    }*/

    @action
    filterPosts() {
        const topicController = this.topic;
        const postStream = topicController.model.postStream;
        const topicOwnerUser = topicController.model.details.created_by;
        topicController.send("filterParticipant", topicOwnerUser);
        console.log(this);
    }


}
