## Why use Trotlling & debouncing

1. performance optimization
2. limiting the rate of executions of particular functions


## Scenrios where Trotlling & debouncing are used

1. Search bar - debouncing is more efficient than trotlling
2. Window resize - trotlling is more efficient than debouncing
3. Button click (Shooting game)
   Realtime Scenerio suppose for Machine gun/Pistol- range 300ms, next shot can made only after 300ms
   -------- trotlling is more efficient than debouncing

## Apply, Call, Bind methods

Every function in javascript has access these Apply, Call, Bind methods

## Create your own function like Apply, Call, Bind methods which will be accessible in every function in javascript

```
Funtion.prototype.myunction = function() {

}
```