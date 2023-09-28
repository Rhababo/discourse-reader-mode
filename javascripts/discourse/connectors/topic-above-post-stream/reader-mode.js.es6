import Component from "@glimmer/component";
import { action } from "@ember/object";
import { filterPosts } from "filterTopicOwnerPosts";
import { closeSidebar } from "sidebarCloser";
//import { withPluginApi } from "discourse/lib/plugin-api";
//import DiscourseURL from "discourse/lib/url";
//import I18n from "I18n";
//import discourseComputed from "discourse-common/utils/decorators";
//import User from "discourse/models/user";

export default class readerMode extends Component {
    @controller topic

    topicOwnerUsername = this.topic.model.details.created_by.username;
    isReaderTopic = this.topic.model.tags.includes(settings.reader_tag) || this.topic.model.category.name.toLowerCase() == settings.reader_category.toLowerCase();

    @action
    activateReaderMode(){
        filterPosts();
        closeSidebar();
    }

}
