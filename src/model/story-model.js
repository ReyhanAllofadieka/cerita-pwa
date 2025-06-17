
import { Api } from '../api/api.js';

export class StoryModel {
  async getStories(token) {
    return await Api.getStories(token);
  }

  async postStory(formData, token) {
    return await Api.postStory(formData, token);
  }
}
