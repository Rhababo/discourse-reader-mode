import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as controller } from "@ember/controller";
import SidebarCloser from "../../components/close-sidebar";
import FilterTopicOwnerPosts from "../../components/filter-topic-owner-posts";

export default class readerMode extends Component {
    @controller topic
    @service site

    topicOwnerUsername = this.topic.model.details.created_by.username;
    isReaderTopic = this.topic.model.tags.includes(settings.reader_tag) || this.topic.model.category.name.toLowerCase() == settings.reader_category.toLowerCase();

    @action
    activateReaderMode(){
        const siteService = this.site;
        console.log(siteService);
       // const filterComponent = new FilterTopicOwnerPosts({owner: this.owner, args: this.args});
        //const sidebarComponent = new SidebarCloser();
        //filterComponent.filterPosts();
       // sidebarComponent.closeSidebar();
    }

}
