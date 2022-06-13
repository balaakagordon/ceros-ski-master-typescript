# Ceros Ski Code Challenge - TypeScript Edition

Welcome to the Ceros Ski Code Challenge!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

**How To Play**

* Use the arrow keys to turn the skier.
* The skier will crash if they hit an obstacle. Use the left/right keys to move away from the obstacle and then down
to resume skiing.
* At some point the rhino will appear, chasing the skier. It will inevitably catch the skier and eat them, ending the
game.
* Use the space bar or a ramp to jump over obstacles like rocks. Please note: you cannot jump over trees.

**Time Limit**

Solutions should be submitted within a week of receiving the challenge. We expect the challenge to take at most two 
hours of your time. We understand that everyone has varying levels of free time and we'd rather you take the time and 
produce a solution up to your ability than rush and turn in a suboptimal challenge. If you require more time, please
reach out to us. Look through the requirements below and let us know when you will have something for us to look at. 
If anything is unclear, don't hesitate to reach out.

**Requirements**

Throughout your completion of these requirements, be mindful of the design/architecture of your solution and the 
quality of your code. We've provided the base code as a sample of what we expect. That being said, we're sure there are 
ways the that the design and architecture could be better. If you find a better way to do something, by all means, make 
it better! Your solution can only gain from having a better foundation.

* **Add a New Feature:**

  Add in the ability for the skier to jump. The asset files for the ramp and the jumping skier are included. All you 
  need do is make them jump. 

  Acceptance Criteria:
  * Jump ramps are added to the game world and appear randomly as the skier skis.
  * The skier should enter the jumping state when they hit the jump ramp.
  * The skier should also enter the jumping state when the user presses the spacebar.
  * The skier should do a flip while jumping, at least one cycle through the jump images provided.
  * While jumping, the skier should be able to jump over some obstacles: 
    * Rocks can be jumped over
    * Trees can NOT be jumped over

* **Documentation:**

  Update this README file with your comments about your work.
  * What did you do and, more importantly, why you built it the way you did.
  * Are there any known bugs?
  * Did you do any bonus items?
  * Tell us how to run it, either locally or through a cloud provider.
  
* **Be original:**
  
  This should go without saying but don’t copy someone else’s game implementation! We have access to Google too!

**Grading** 

Your challenge will be graded based upon the following criteria. **Before spending time on any bonus items, make sure 
you have fulfilled this criteria to the best of your ability, especially the quality of your code and the 
design/architecture of your solutions. We cannot stress this enough!**

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* How well you document your solution. We want to know what you did and **why** you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write unit tests for your code

We are looking forward to see what you come up with!!

---

**New Changes**

**New  Features**
* Jump ramps added as a new obstacle. Ramps show up randomly, like all the other obstacles, however, the player's interaction with jump ramps is different to that with the other obstacles.
* The ability for the player to jump over obstacles by either going over a ramp or using the spacebar to jump manually.
* When the skier jumps, they perform a flip, based on the given animation images. Rocks can be jumped over, however, trees cannot be jumped and thus, they must be avoided using the directional controls.
* The ability for the player to pause or reset the game.
  * The player can pause using the `F` key.
  * When the game is paused, a pause icon is shown on the screen and the skier and the rhino both remain stationary.
  * The player can reset the game at any time using the `R` key.
  * Pause and Reset keys were selected based on what I deemed to be the optimal comfort level for the player.
* A score counter which keeps track of the player's score, as they progress down the ski slope. The score only increments when the skier is actively moving down the slope so they don't get any points when crashed or stopped.
* The game difficulty increases progressively.
  * The speed of the skier and the rhino increase as the game progresses, requiring the player to react faster to obstacles.
  * The frequency of the obstacles also increases, as the score goes up, so that the player has to navigate a more congested screen.
* This game is available at [this Heroku link](https://ceros-ski-master-gbalaaka.herokuapp.com/)


**Other Additions**

NB: The following changes were not requested in the project specification. I added these as minor improvements, so that we can discuss them in the technical interview, however, in practice, I would have raised these as questions/suggestions, to the Product Manager, before beginning this task.
* Since I made the jump ramp an obstacle, I set it as another jumpable obstacle so that when a player manually jumps right before a ramp, they do not interact with it.
* When the skier jumps, I slightly magnified the image of the skier in order to give the game a 3D effect. This addition could be refined further, by setting varying magnification sizes for the images in the flip animation.
* I removed the ability for the skier to turn or change direction when they are in the air. I figured that this would make the game a little more realistic and would push the player to be more intentional with their jumps, in order to avoid obstacles.
* I added a pause icon to show clearly, when the game is paused.
* I also turned down the initial speeds of the skier and rhino, to give the player a better chance to accumulate some points and get immersed in the game.
