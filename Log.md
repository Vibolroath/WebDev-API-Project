# Here will be the log of work done for website:
# Users Part of this Project:

Cameron Jones : 47193972 
Widget: trivia-widget

Vibolroath Leav : 46120386
Widget: holidays-widget

Socheata Cheth : 47349115
Widget: inspirequotes-widget

# websites used to help with posting and making the blog appear:
https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent 
https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events 
https://javascript.info/dispatch-events 

# Log for commits: 

25/04/2023 -> Created the group website for everyone to work on

26/04/2023 -> Started the creation of the `<trivia-widget>` (in replace of the first widget). Had a few issues connecting it to the `<comp2110-portal>` but they were minor and were overcome (forgot to add a ' . ' before the import at top of the `<comp2110-portal>` page )

27/04/2023 -> Did some re writing of code and finally managed to get the API widget pop up on the website. I can now style it up and make it look nice. Added some comments and cleaned it up a little

29/04/2023 -> Just playing to enhance the widget a little. Now adjust its size according to the fact so it doesn't go outside the box

4/05/2023 -> partially fixed the loading blog issue. Returns text that says no blog posted but the widgets to the right of the text dont stay fully right on the page and there is a large white space.Managed to fix it by using a certain width command `vw`. This sets the width to be equal to the viewport width.

5/05/2023 -> testing around with making webpage look a bit nicer by putting all the widgets to one side and using the `vw` command to adjust the title size when page gets resized so there isnt big white space when its smaller

8/05/2023 -> Started working on the blog post application. Have managed to write some code and comment so i know what i am doing. So far have got a form to appear but having an error with the token validation, will need to do some debugging later to fix that and hopefully we can get everything working

10/05/2023 -> Looking at the issues regarding the blog section. Still working on it.

11/05/2023 -> `<conversion-widget>` was created and implemented into portal, still having the functionality coded however.

12/05/2023 -> Working on `<inspirequotes-widget>` and complete the widget.

13/05/2023 -> `<conversion-widget>` fully functional and implemented into final design of the website portal.

13/05/2023 -> after some debugging and testing random things the internet suggested, figured out how to send and display blog posts using custom events that relate to the title and contents of the post. For example, 
In `updateTitle`, `event` represents the event object triggered by the input field. `event.target` refers to the input field element itself, and `event.target.value` retrieves the current value entered by the user in the input field. This value is then assigned to the `this.title` property, updating its value. The page then refreshes after a post so you can see it has been posted. Not entirely sure before whether it was sending through and not display as i could see it being sent in the network panel but at least now everything works properly and the css can focused more on 

14/05/2023 -> Worked on some of the css stylings for blog-post, login-form, and some other minor stuff.