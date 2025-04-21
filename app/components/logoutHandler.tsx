import Session from "supertokens-web-js/recipe/session";

export default async function LogoutHandler () {
  await Session.signOut(); 
  window.location.href = "/login"; // or to wherever your logic page is
}