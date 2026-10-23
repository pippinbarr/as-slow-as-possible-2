# Reflective Journal

## Starting point -- 22 October 2026

Started trying to make this game just before class today, thinking in the first moments that it would be kind of trivial to make a game where the entire point is to ask the player how slowly they can bear to move something on the screen (makes sense for touch as I think about it?). So I had the image of a starting point and an ending point and the general though that you try to take as long as possible to get from one to the other (very much along the lines of Marina Abramovic's exercise -- which was called As Slow As Possible? Was it?)

![Starting image of the game layout](./images/Screenshot%202026-10-22%20at%2015.20.29.png)

Complications ensued as soon as I started to think about it, including in conversation with the class who had some good thoughts about potential design directions. I started out by presenting a central design decision being about pure duration versus duration+movement: i.e. is it better to move agonizingly slowly (but to be in constant motion) or to take as long as possible while potentially just leaving the game running while you're not there? Both have their experiential merits. The thought of somebody leaving it running to take the longest possible amount of time is kind of an interesting idea, but so is the more direclty physical approach of making sure they're present (that's more in keeping with Marina's work as well).

So... what? If I think about it specifically as a mobile game then it makes me think in part about *Bounden* which leveraged the idea of continuous contact with the surface of a phone to enforce certain kinds of body dynamics. If you had that continuous touch rule in this game then the player has to *be there* the whole time, which I think is a fairly simple answer to the question of what the "big time" relationship to it is (it's not meant to be left running for five years unattended?).

But then there's the question of velocity of movement (presumably we want it to be *slow* and not potentially really fast in circle but never reaching the end point?). Crucially, on top of everything, I want it to always be possible to be *slower*, right? That's what I think messes me up? Because I forgot to mention that I think of that as the point of making a sequel - *As Slow As Possible* is indeed *very slow* but by definition it's never as slow as *possible* because you could set things to move more slowly.

ALTHOUGH... is there a real "as slow as possible" premised on the idea of the minimal detectable (visible) movement per frame? (It might be device dependent among other things which would potentially be hellish?). Does moving a little bit, stopping, moving a little bit more, stopping, moving... is that overall to be considered "moving slowly" or is it "moving a little bit at a time" and therefore distinct? Is slow movement inherently continuous?

I suppose we could have an "average velocity" measure that would at least prevent a "tactic" of just moving your finger around at random to take time and then eventually reaching the goal? That would have a high average velocity.

While I'm thinking of it, I like the idea of the movement leaving a trace which has notations on it about the duration it took to get there.

While I'm thinking of it, what if the core requirement was only that you have to move towards the goal (for some definition of "towards") and that's it? But then you run into the thing of moving a pixel, waiting an hour, and then moving the rest of the way? Is that really "moving slowly"? It's a feat of time-spending, but I'm not sure I'd call it pushing the player to experience *slowness* in particular. 

This case would also have a low average velocity because of all the *zeros*. Although perhaps you would discount all zero-velocity movements? But then again you start to bump up against the minimal detectable movement? There is a "quantum" involved there that can't be beaten right?

So... well what? Am I talking myself out of it? Maybe there's a different route where it's more about challenging folks to take a certain amount of time, trusting in the idea that the slowness threshold would never be crossed by (sane) players? It's a bit of a cheat again though.

There's something interesting and frustrating in this.

## Make some moves -- 22 October 2026

Okay I'm back and wanting to think about practicalities now. I just sat here and slid my index finger along my phone "slowly" and it felt insanely slow to do it over the course of like 10 seconds?

(I also thought to myself in the context of teaching sometimes and making things move very slowly that you do have a thing of saying to yourself "is that moving?" and then you see a little movement and say "yes it is"... just as a comment maybe "against" continuous movement?)

Here are some "versions" of this thing

- A challenge approach where the point is to challenge them to take "this long" to move from start to finish. Ten seconds, twenty, a minute... an escalation that would drive a person insane long before you run into the "Planck length" stuff?

- A "slow as you like" version where you draw a trail and insist on vertical movement, but not on how frequent that movement needs to be, maybe with little timestamp indicators over time? Maybe some sort of rough "constant velocity" requirement involved? (That would maybe be a solution to a lot of this though feels mathsy in a way I'm not exactly thrilled to implement)... almost like a "gambit" where how slow you start is how slow you need to carry on? (Would need some UI to help people manage that)

- A "race" against a computer opponent where you're trying to finish *after* the computer (I like this)

- And then of course we get to multiplayer potentially where you're trying to finish last (could lead to extra-curriculum jostling and stuff but that's also potentially quite funny). With or without the whole enforced average velocity idea this would be pretty good?

(It's possible to imagine a menu where these things are all options?)

The thing of pitching it as going "slower than" something/something else is helpful? It changes the focus away from probably less interesting questions about quanta.