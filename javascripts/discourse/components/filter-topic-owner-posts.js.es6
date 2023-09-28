import Component from "@glimmer/component";
import { inject as controller } from "@ember/controller";
import { action } from "@ember/object";

export default class filterTopicOwnerPosts extends Component {
    @controller topic;

    @action
    filterPosts() {
        const topicController = this.topic;
        //const postStream = topicController.model.postStream;
        const topicOwnerUser = topicController.model.details.created_by;
        topicController.send("filterParticipant", topicOwnerUser);
        console.log(this);
    }

}
