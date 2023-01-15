//function that delays the index toDoPrompt trigger so the console displays correctly

// This function makes the question prompt be delayed so that the console
// can log the returned results correctly without overlapping
const timedPrompt = () => {
  const toDoPrompt = require("./to_do_prompt");
  setTimeout(() => {
    toDoPrompt();
  }, 500);
};

module.exports = timedPrompt;
