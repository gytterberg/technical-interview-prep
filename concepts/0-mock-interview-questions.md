1. (JS) changeStuff problem (evaluation strategies) (https://repl.it/BRIP)
	1. Pass by value strategy for primitives
	2. Call by sharing for objects. Objects passed into the function are shared, but once the function overwrites it the function only works with its own version.
		- Similar to pass by reference in that the function is able to modify the same mutable object but unlike pass by reference isn’t able to assign directly over it. 
		- https://repl.it/BRIP/27  
2. (CSS) Explain the CSS box model
	1. Margin - pushing other elements away (margin collapses)
	2. Border
	3. Padding - pushing content in
	4. Content
3. (CSS) Explain box-sizing. 
	1. Width and height of element include content or border, padding and content - depending on the value of box-sizing
4. (REDUX) What are the 3 functions the Redux store supports? What are their type signatures?
	1. getState :: () -> State      -  get the current state of the Redux store
	2. dispatch :: Action -> Action   -  ‘dispatches’ an action to the store, which calls the reducer and updates the current state
	3. subscribe ::  Listener -> Unsubscriber  - takes a function of 0 args that runs in response to any store update. Returns a 0 arg function for unsubscribing if desired
	4. BONUS: replaceReducer :: new Reducer -> ???
		- “an advanced API”; use case: for breaking out your app into multiple bundles
5. (NODE) Sockets vs HTTP
	1. Sockets: supports different protocols, commonly uses TCP directly. Allows for persistent 2-way communication.
	2. HTTP: application protocol built on top of TCP (transport protocol). Stipulates that 1 client requests renders 1 server response
6. (CSS) Explain the difference between display: none and visibility: hidden
	1. display:none - the tag will not appear on the page at all (although you can still interact with it through the dom). There will be no space allocated for it between the other tags.
	2. visibility:hidden - the tag is not visible, but space is allocated for it on the page. The tag is rendered, it just isn't seen on the page.
7. CSS What is the purpose of a media query?
	1. Allows content rendering to adapt to conditions such as screen resolution
8. CSS Explain mobile first development
9. (JS) The THIS problem (https://repl.it/BRIR)
	1. `bind` returns a new function bound to the specified context
	2. `new` creates a new object `{}` and assigns it as the context
	3. `new` trumps `bind`
10. (NODE) Name three globals in node environment. 
	1. There are several node globals. To brush up on your node (and remember: a common misperception about bootcamp grads is that they’re only capable of assuming front-end positions), use the node docs and the resources listed here.
11. (JS) What are the two textbook differences between a function declaration and a function expression?
	1. Function declarations: are hoisted, cannot be immediately invoked
	2. Function expressions: are not hoisted, can be immediately invoked. 
	3. fun fact you should definitely mention if ever asked this question: we use enclosing parentheses (also known as grouping operators) to wrap anonymous IIFEs so that the JavaScript Engine will interpret the function as an expression and not a declaration and allow us to immediately invoke it. 
	4. The engine treats as a function declaration anything that starts with an unvarnished function keyword (the first parenthesis  is the varnish).
12. (JS) Describe the concept of hoisting in JavaScript.
13. (JS) Define lexical scope. What are two functionalities in JS that can cheat lexical scope? 
	1. Lexical scope means that scope is defined by author-time decisions of where functions are declared. 
	2. The much maligned eval and with utilities can be used to cheat lexical scope. 
14. (CS) What is the biggest disadvantage of the pub/sub design pattern?
	1. The decoupling of functionality provided by the pub/sub design pattern is its greatest strength and its greatest weakness. For example, if you change the order or number of arguments published, you must find all the listeners and change their arguments accordingly. So, unlike the singleton design pattern, which is highly centralized insofar as we can simply add a method to the exported object to make the added functionality available to all of the functions that depend on it, we can’t just change code in one place and expect that change to propagate to all of the dependencies. Consider how tedious it could be to have to find all of the listeners to make them reflect a change you made to a single publisher. 
15. (JS) What is the difference between using the new keyword and using Object.create? 
	1. Unlike the new operator, Object.create() does not execute a constructor function with the newly created object (thereby giving it own properties). 
16. (JS) Describe the way the event loop operates in JavaScript.
17. (NODE) Name three node code modules and give an example of how you might use each.
18. (JS) Explain 3 new features of es6
19. (JS) Explain currying
20. (CSS) Vertically and Horizontally center a div (without flexbox)
21. (JS) What upcoming frameworks/language features/ tools are you most excited about
22. (CSS) Describe calc() functions
23. (REACT) What’s the difference between a container and a component in the react-redux way of doing things? Why this separation?
	1. A container is ‘Redux-aware’ - it maps state from the store and dispatch functions onto the props of a regular component
	2. A component is not Redux-aware, it simply takes in data or functions in the form of props
	3. The purpose of this separation is to make it easy to reuse a component regardless of whether it uses Redux. A React component should only have to care about the props, and the Container acts as a higher-order component to ‘wrap’ a regular component, hooking up the props to the Store specifically
24. What are 2 ways of referring to a specific element in React
	1. Ref 
	2. findDOMNode :: Component -> corresponding Native DOM node
25. (REACT) What are some ways of kicking off ‘initialLoad’ AJAX requests for data with React and then re-rendering?
	1. componentWillMount/componentDidMount lifecycle methods
	2. AJAX request calls this.setState on response, causing a page reload
	3. Use React Router 3 and onEnter prop to kick off the AJAX request, on return update the Redux store. Use a container to map the store to the props for an auto-re-render
26. (JS) Why do we write ‘this.method = this.method.bind(this)’ in a component constructor body? What is an example where not doing that would cause an issue?
	1. Imagine methods
myAjaxFunction: () => $.getUsers('/users', (data) => this.setState({ users: data })
	Without a ‘this.handleUsers = this.handleUsers.bind(this)’ then the callback is run in the global context. With the bind the ‘this’ is always explicitly set to the class instance 
27. (REACT) What is a ‘dumb’ component and why is it unique? What disqualifies something from being a dumb component?
	1. A dumb component is a component that simply has a render function. It is ‘stateless’ because it simply takes in data as props and that entirely determines it’s render. It is unique because it is stateless and therefore simple to test and think about and it also can be written in a unique form, and React can optimize performance for these components. What disqualifies one from being ‘dumb’ is needing a constructor (stateless components lack a ‘this’) and using ‘setState’ or ‘ref’. Really, if you need anything additional besides your render function, it is not ‘dumb’
28. (DB/ARCHITECTURE) Imagine you are approached by Parker Bros to design a web application for the game Monopoly. How would you go about this, starting with the way that you would design the database?
	1. Think ERDs for the DB
	2. Consider the UI (diagrams for different states on the same view maybe, when might you need to communicate with the backend - i.e. submit requests this and returns that and updates everything)
29. (SCALE) Imagine your capstone project starts exploding in popularity. What steps would you take to be able to handle the increasing load of users?
30. (REDUX) Can you explain why you would choose to use Redux for a project?
31. (NODE) What kind of projects would you use Node for, and why? Are there any projects that you would choose to not use Node for?
	1. Remember that Node is single-threaded. How might that affect things?
32. (JS) A very difficult concept for many newcomers to javaScript is the `this` keyword. Can you explain `this` to me, as if I were new member on your team who isn’t as familiar with JavaScript?
