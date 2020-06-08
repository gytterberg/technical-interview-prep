# Design and render the virtual DOM

## Prompts

I generally break this question into three parts:

1. What does the `render` function provided by `react-dom` do?
2. What exactly is a virtual DOM node?
3. Implement a simplified `react-dom`.`render`.

### 1. What does the `render` function provided by `react-dom` do?

The correct answer is,

  > `react-dom.render` takes a virtual DOM node (a `React.Element`) and a
  > real DOM node (an `Element`), and mounts the virtual DOM onto the
  > real DOM. It constructs and mounts any Components specified by the virtual
  > DOM tree, calling their lifecycle methods as appropriate. Importantly, it
  > also kicks off React's reconciliation process, continuously mutating the
  > (real) DOM to reflect the current state of the virtual DOM.

To date, nobody has said this.

Almost invariably, students begin by describing the `React.Component.render`
method. This is incorrect, but useful, as it lets us gauge their baseline level
of comprehension.

A response indicating strong understanding of React might be,

  > A React Component's `render` method returns a virtual DOM node, or null. The
  > node is the root of a virtual DOM tree representing the component. `render`
  > should be free of side-effects; it should be a pure function of the `Component`'s
  > `state` and `props`.

A more typical response,

  > It returns the HTML for the component.

This is a great moment to correct any misconceptions they have about React fundamentals.

Then, I nudge them towards actually answering the question. Typically, I have to jog their memory
by saying it's a function that you only call once, when the app starts up, and usually the line
includes a call to `document.getElementById`.

If they get really stuck, it's fine to remind them about it.

By the time we move on, we should be in agreement on these points:

  * The signature of the function in question is `render(element: React.Element, container: Element)`
  * It takes a virtual DOM node and a real DOM node, *and those are different things*  
  * In prticular, virtual DOM nodes *are JSX* (or: when you type JSX, you are typing virtual dom literals).

This opens the next question, which is: what exactly is a virtual DOM node?

### 2. What exactly is a virtual DOM node?

The answer is,

```
type Element = {
  type: string | class,
  props: { children: [...Element], className?: string, etc. },
  key : string | boolean | number | null,
  ref : string | null
}
```

But `key` and `ref` aren't relevant for our purposes, so this is fine too:

```
{
  type: string | class,
  props: { children, className, etc. },
}
```

This step is usually quite intimidating. Some students have literally never seen a virtual DOM
node printed to the console—JSX just looks like magic. I offer a few hints quite readily:

  1. Remember that JSX is converted to calls to `React.createElement()`. So we're asking what
     that function returns.
  2. `createElement` doesn't do anything too clever—it mostly just wraps its arguments in an object
     and returns that object
  3. The transpiler is not that smart. The same line of JSX code is *always* going to become the
     same call to `React.createElement`. So the arguments to that function must all be there in the JSX,
     just shuffled around syntactically.

It's common for students to try to start off with just a bag of props.

```
{ tag: string, className: string, key, etc... }
```

You can ask, "Okay, but what if there's a prop named `tag`?" to nudge them in the right direction.

Another common issue is picking a representation for virtual DOM nodes that doesn't actually parse anything.
I've had students say they'll "parse" it as the literal source string, like "<Component prop={foo} />". I generally
ask how they'll get the value of foo when I ask them to render that component, which I am totally going to ask them to do.

Once they've gotten the general layout (tag, a separate `props` field, and `children` as part of `props`), I ask
them how they intend on differentiating Components from HTML tags. This is mostly to remind them that virtual DOM nodes
actually can contain a reference to the component class, and for that matter that classes are things you can hold
references to. After we've established the fact that `type` can be either a `function` or a `string`, I usually give
away the simple answer: the transpiler turns lower case tags into vDOM elements whose `type` is a string, and capitalized
tags into vDOM elements whose `type` is a class (by passing in the identifier, which must be in scope).

Once we have a shared understanding of what a virtual DOM tree is, I ask them to write a render function.

### Implement a simplified `react-dom`.`render`

Specifically, the function we're going to implement is:

```
render(element: VirtualElement) -> Element
```

Note that this differs from `react-dom.render` in that it returns, rather than mutating, an Element.

Also, I tell them that they can ignore elements that are Components for now. All their `VirtualElement`s
will have `string` `type`s.

Here's some code that does that:

```javascript
// render(element: VirtualElement) -> Element
//
// Takes a Virtual DOM tree and returns a tree of real DOM elements
// described by it.
function render(element) {
  const dom = document.createElement(element.type)
  Object.keys(element.props)
    .forEach(prop => handle(element, prop, element.props[value]))
  return element
}

// handle(domElement: Element, prop: String, value: any) -> Void
//
// Mutate domElement as appropriate for the prop and value.
function handle(domElement, prop, value) {
  // Special case handlers
  if (prop in handlers)
    return handlers[prop](domElement, prop, value)

  // Event listeners
  if (prop.startsWith('on') && typeof value === 'function') {
    domElement[prop.toLowerCase()] = value
    return
  }
  
  // Otherwise, set the prop as an attribute on the DOM node.
  domElement.setAttribute(prop, value)
}

const handlers = {
  className(e, prop, value) { e.setAttribute('class', value) },

  style(e, prop, value) { Object.assign(e.style, value) },

  children(e, prop, value) {
    value.forEach(child => e.appendChild(render(e)))
  },
}
```

Initially, I don't have them worry about event listeners, or special case props like
`className` and `style`. I'm also quite liberal with hints on how to create and manipulate
DOM elements—there's no sense in hiding `document.createElement` from them if they don't know
it offhand.
