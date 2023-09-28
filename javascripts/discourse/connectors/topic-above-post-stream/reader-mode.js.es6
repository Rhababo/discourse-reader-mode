import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as controller } from "@ember/controller";
import { closeSidebar } from "../../components/close-sidebar";
import { filterPosts } from "../../components/filter-topic-owner-posts";

export default class readerMode extends Component {
    @controller topic

    topicOwnerUsername = this.topic.model.details.created_by.username;
    isReaderTopic = this.topic.model.tags.includes(settings.reader_tag) || this.topic.model.category.name.toLowerCase() == settings.reader_category.toLowerCase();

    @action
    activateReaderMode(){
        filterPosts.call(this);
        closeSidebar.call(this);
    }

}
