import Component from "@glimmer/component";
import { action } from "@ember/object";
import { filterPosts } from "../components/filterTopicOwnerPosts";
import { closeSidebar } from "./components/sidebarCloser";

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
