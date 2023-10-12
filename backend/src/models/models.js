import db from "../db";

const Users = db("user");
const Competitions = db("competition");
const Teams = db("team");
const TeamMembers = db("team_member");
const Announcements = db("announcement");
const TodoLists = db("to_do_list");
const TodoListItems = db("to_do_list_item");
const Galleries = db("gallery");
const GalleryItems = db("gallery_item");
const ProfilePosts = db("profile_post");
const Comments = db("comment");

// export {
//     Users,
//     Competitions,
//     Teams,
//     TeamMembers,
//     Announcements,
//     TodoLists,
//     TodoListItems,
//     Galleries,
//     GalleryItems,
//     ProfilePosts,
//     Comments,
// };
