export const PLAY = {
  id: 'example',
  title: 'Hamlet',
  subtitle: 'Act 3, Scene 1',
};

export const CHARACTERS = ['Hamlet', 'Ophelia'];

export const SCRIPT = [
  { type: 'direction', text: 'Hamlet enters.' },
  {
    type: 'line',
    character: 'Hamlet',
    parts: [
      'To be, or not to be, that is the question: whether \'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them.',
      'To die — to sleep, no more; and by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to: \'tis a consummation devoutly to be wish\'d.',
      'To die, to sleep; to sleep, perchance to dream — ay, there\'s the rub: for in that sleep of death what dreams may come, when we have shuffled off this mortal coil, must give us pause.',
      'Thus conscience does make cowards of us all; and thus the native hue of resolution is sicklied o\'er with the pale cast of thought. — Soft you now! The fair Ophelia! Nymph, in thy orisons be all my sins remember\'d.',
    ],
  },
  { type: 'line', character: 'Ophelia', text: 'Good my lord, how does your honour for this many a day?' },
  { type: 'line', character: 'Hamlet', text: 'I humbly thank you; well, well, well.' },
  { type: 'line', character: 'Ophelia', text: 'My lord, I have remembrances of yours that I have longed long to re-deliver. I pray you, now receive them.' },
  { type: 'line', character: 'Hamlet', text: 'No, not I; I never gave you aught.' },
  { type: 'line', character: 'Ophelia', text: 'My honour\'d lord, you know right well you did; and with them words of so sweet breath composed as made the things more rich: their perfume lost, take these again.' },
  { type: 'line', character: 'Hamlet', text: 'Ha, ha! are you honest?' },
  { type: 'line', character: 'Ophelia', text: 'My lord?' },
  { type: 'line', character: 'Hamlet', text: 'Are you fair?' },
  { type: 'line', character: 'Ophelia', text: 'What means your lordship?' },
  { type: 'line', character: 'Hamlet', text: 'I did love you once.' },
  { type: 'line', character: 'Ophelia', text: 'Indeed, my lord, you made me believe so.' },
  { type: 'line', character: 'Hamlet', text: 'You should not have believed me; for virtue cannot so inoculate our old stock but we shall relish of it: I loved you not.' },
  { type: 'line', character: 'Ophelia', text: 'I was the more deceived.' },
  { type: 'line', character: 'Hamlet', text: 'Get thee to a nunnery: why wouldst thou be a breeder of sinners? Where\'s your father?' },
  { type: 'line', character: 'Ophelia', text: 'At home, my lord.' },
  { type: 'line', character: 'Hamlet', text: 'Let the doors be shut upon him, that he may play the fool nowhere but in\'s own house. Farewell.' },
  { type: 'direction', text: 'Hamlet exits.' },
  {
    type: 'line',
    character: 'Ophelia',
    parts: [
      'O, what a noble mind is here o\'erthrown! The courtier\'s, soldier\'s, scholar\'s, eye, tongue, sword; the expectancy and rose of the fair state, the glass of fashion and the mould of form, the observed of all observers, quite, quite down!',
      'And I, of ladies most deject and wretched, that suck\'d the honey of his music vows, now see that noble and most sovereign reason, like sweet bells jangled, out of tune and harsh; that unmatch\'d form and feature of blown youth blasted with ecstasy: O, woe is me, to have seen what I have seen, see what I see!',
    ],
  },
];
