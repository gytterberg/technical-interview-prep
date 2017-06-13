1 - changeStuff problem (evaluation strategies) (https://repl.it/BRIP)

2 -  The THIS problem (https://repl.it/BRIR)

2.5 - Explain the CSS box model (consists of margin, border, padding, and content)

3 - Name three globals in node environment. 
answer: there are several node globals. To brush up on your node (and remember: a common misperception about bootcamp grads is that they’re only capable of assuming front-end positions), I suggest you use the resources listed here: also https://nodejs.org/api/globals.html 

4 - What are the two textbook differences between a function declaration and a function expression?
answer: function declarations are hoisted, function expressions are not; function expressions can be immediately invoked, function declarations cannot.  fun fact you should definitely mention if ever asked this question: we use enclosing parentheses (also known as grouping operators) to wrap anonymous IIFEs so that the JavaScript Engine will interpret the function as an expression and not a declaration and allow us to immediately invoke it. The engine treats as a function declaration anything that starts with an unvarnished function keyword (the first parenthesis  is the varnish).

5 - Define lexical scope. What are two functionalities in JS that can cheat lexical scope? 
answer: Lexical scope means that scope is defined by author-time decisions of where functions are declared. The much maligned eval and with utilities can be used to cheat lexical scope. 

6 - What is the biggest disadvantage of the pub/sub design pattern?
answer: the decoupling of functionality provided by the pub/sub design pattern is its greatest strength and its greatest weakness. For example, if you change the order or number of arguments published, you must find all the listeners and change their arguments accordingly. So, unlike the singleton design pattern, which is highly centralized insofar as we can simply add a method to the exported object to make the added functionality available to all of the functions that depend on it, we can’t just change code in one place and expect that change to propagate to all of the dependencies. Consider how tedious it could be to have to find all of the listeners to make them reflect a change you made to a single publisher. 

7 -  What is the difference between using the new keyword and using Object.create? 
answer: Unlike the new operator, Object.create() does not execute a constructor function with the newly created object (thereby giving it own properties). 


Tom’s Extra Fun Questions

(NODE) Name three node code modules and give an example of how you might use each.
(CSS) Explain the difference between display: none and visibility: hidden
(JS) Describe the concept of hoisting in JavaScript.
(JS) Describe the way the event loop operates in JavaScript.

Dan’s EC

(NODE) Sockets vs HTTP
(JS) Explain 3 new features of es6
(JS) Explain currying
(Angular) How can 2 controllers communicate w/ each other
(Angular) $Scope digest cycle
(JS) What upcoming frameworks/language features/ tools are you most excited about
(CSS) Describe calc() functions
(ANGULAR) ng-show vs ng-if

Ben’s EC (with answers)

What are the 3 functions the Redux store supports? What are their type signatures?
getState :: () -> State      -  get the current state of the Redux store
dispatch :: Action -> Action   -  ‘dispatches’ an action to the store, updating the current state
subscribe ::  Listener -> Unsubscriber  - takes a function of 0 args that runs in response to any store update. Returns a 0 arg function for unsubscribing if desired
What’s the difference between a container and a component in the react-redux way of doing things? Why this separation?
A container is ‘Redux-aware’ - it maps state from the store and dispatch functions onto the props of a regular component
A component is not Redux-aware, it simply takes in data or functions in the form of props
The purpose of this separation is to make it easy to reuse a component regardless of whether it uses Redux. A React component should only have to care about the props, and the Container acts as a higher-order component to ‘wrap’ a regular component, hooking up the props to the Store specifically
What are 2 ways of referring to a specific element in React a la jQuery or the traditional DOM
Ref 
findDOMNode :: Component -> corresponding Native DOM node
What are some ways of kicking off ‘initialLoad’ AJAX requests for data with React and then re-rendering?
componentWillMount/componentDidMount lifecycle methods
AJAX request calls this.setState on response, causing a page reload
Use React Router and onEnter prop to kick off the AJAX request, on return update the Redux store. Use a container to map the store to the props for an auto-re-render
Why do write ‘this.method = this.method.bind(this)’ in a component constructor body? What is an example where not doing that would cause an issue?
Imagine methods
 myAjaxFunction: () => $.getUsers('/users', (data) => this.setState({ users: data })

Without a ‘this.handleUsers = this.handleUsers.bind(this)’ then the callback is run in the global context. With the bind the ‘this’ is always explicitly set to the class instance 

6. What is a ‘dumb’ component and why is it unique? What disqualifies something from being a dumb component?
A dumb component is a component that simply has a render function. It is ‘stateless’ because it simply takes in data as props and that entirely determines it’s render. It is unique because it is stateless and therefore simple to test and think about and it also can be written in a unique form, and React can optimize performance for these components. What disqualifies one from being ‘dumb’ is needing a constructor (stateless components lack a ‘this’) and using ‘setState’ or ‘ref’. Really, if you need anything additional besides your render function, it is not ‘dumb’

