export default interface Comment {
  id?: string;
  text: string;
  user_id: string;
  content_id: string;
  comment_id?: string;
  references?: string[];
}
