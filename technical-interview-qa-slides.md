class: center middle
# Prompts in the interview process

---
class: center middle
# What to expect when you're expecting (a technical interview)
---
# There are technical things...

- algorithms, e.g. *impelement mergesort*

- concept questions, e.g. *what is closure*

- code analysis, e.g. *what does this code print*

- project code spelunking, e.g. *tell me about this function you wrote for your project*

- coding challenge, e.g. *build an app that allows users to create and share quizzes*

- logic / reasoning puzzles, e.g. *how many golf balls fit in a bus*

- architecture, e.g. *design battleship*

---
# ...there are non-technical things:

- culuture fit questions, e.g. *what drew you to us in particular*

- experiences questions, e.g. *tell me about a time when...*

- scenarios, e.g. *your PM meets with your team of eight to lay out a new feature you'll be buiding, and she tells you the deadline is in one month, but to you it sounds like it'll take a minimum of 2 months*

---
# Good technique across the board (a)

- have fun! bring curiosty, enthusiasm, and joy

- treat interviewer as collaborator/friend — remember they *want* to hire you

- be candid, don't b.s.

- focus on what you *do* know, not what you don't
---
# Good technique across the board (b)

- ask for silent thinking time if you need it

- engage your interviewer as much as possible (as little unplanned silence as possible)

- "breadth first" approach: break problems up into sub problems and solve each of those—e.g. you implement mergesort by doing:

```js
  function mergeSort (arr) {
    const halves = splitInHalf(arr);
    const sortedLeft = mergeSort(halves[0]);
    const sortedRight = mergeSort(halves[1]);
    return mergeInOrder(sortedLeft, sortedRight);
  }
```

---

# Things will go wrong

- remember how many times something went wrong learning / building something at Fullstack, remember you evolved past it

- commiserate ~> re-hash ~> learn ~> adapt (what doesn't kill you makes you stronger)

- reach to others (including your peers and me)

---
class: center middle

# A Bestiary of Common Prompts

---

# Algorithms

- often involve a whiteboard

- REACTO

- focus on talking through it

*Why do interviewers do this?*

- they're trying to see how you think
- how you approach problems
- what's in your neural database
- a sort-of simlulated pair-programming / teamwork environment
- what you're like without your fancy tools

---

# Concept questions

- domain knowledge (trivia)

- focus on what you *do* know

- use examples

- use metaphors

*Why do interviewers do this?*

- probe the depth of your understanding
- can indicate passion for the technology
- communication skills

---

# Code analysis

- debug, analyze, refactor some code they give you

- reasoning >> truth

*Why do interviewers do this?*

- your job will involve looking at code you didn't write
- probe the depth of your understanding
- what your reasoning looks like

---

# Project code spelunking

- questions about code you've written

- if they ask you about things you didn't do

- be honest

- if you can elaborate / explain what's happening, do

- offer another spot that you worked on

*Why do interviewers do this?*

- validate your contribution
- tangible sense of you as a programmer
- try to get a sense of project planning / management

---

# Coding challenge

- usually given mid-interview

- done by yourself asynchronously over the course of day(s)

- try to stand out

- don't solve all sorts of problems they don't ask for

- tests!

- insides >> outsides

- time management can be tough

*Why do interviewers do this?*

- free work
- work ethic / initiative / meeting deadlines
- a lot like spelunking, but more standardized

---

# Logic / reasoning puzzles

- solve this riddle

- sometimes there'll be a "right" answer, other times not

- if you get this, rejoice, because you can explore the problem

*Why do interviewers do this?*

- somebody can stand out without "domain" knowledge
- looking for how "bright" is this person
- how does this person think about problems
- probing for reasoning abilities
- maybe they're a bit too into themselves

---

# Architecture

- high-level planning, often involves *zero* coding

- may involve mentioning tools / libraries

- ask a lot of questions, interviewers will mean different things when they say something like "design battleship"

- think about Entity-Relationship Diagrams (ERDs)

- think about UX flows

- think about needs and the tools that solve those needs

*Why do interviewers do this?*

- less "mechanical" more "abstract" top-level thinking
- how data flows in an application
- there's a difference between a "programmer" and an "software engineer"
