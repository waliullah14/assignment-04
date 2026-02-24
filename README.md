## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

<p>
getElementById is used to obtain only one specific element of the document.<br>
getElementsByClassName is used to obtain all the elements of an document having the same class. it returns a html collection.<br>
querySelector is used to obtain a particular element using css selector. after getting an element it stops further searching<br>
querySelectorAll is used to obtain all the elements that matches the given css selector. it returns a nodelist.
</p>

### 2. How do you create and insert a new element into the DOM?

<p>
For creating we use document.createElement() and pass the desired tagname within '' as an argument.<br>
Then we add innerHTML to the neewly creater element. Then we append the element to the parent node this way:
parentNode.appendNode(childNode)
</p>

### 3. What is Event Bubbling? And how does it work?

<p>
Bubbling is the process where when a child node is triggired then the parentNodes get triggered gradually. When we click a button inside a div then the button is triggered first and then the parent div is triggered. this continues until the full document is obtained.
</p>

### 4. What is Event Delegation in JavaScript? Why is it useful?

<p>
Event Delegation means to add event listener in a parent to use that event listener for all the children of that parent. It is useful because it saves memory as the single event listener can work for all the children. thus this can improve the code performance and reduce code length.
</p>

### 5. What is the difference between preventDefault() and stopPropagation() methods?

<p>
preventDefault() method is used to stop any default behavior of the browser. on the other hand stopPropagation() is used to stop the bubbling process to stop triggering of parent elements.
</p>

---
