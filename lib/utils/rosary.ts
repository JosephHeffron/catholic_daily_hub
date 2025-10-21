type RosarySet = 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous'

const sets: Record<RosarySet, { title: string; meditation: string; scriptureRef?: string }[]> = {
  Joyful: [
    { title: 'The Annunciation', meditation: 'Mary says yes to God’s plan with humble faith.', scriptureRef: 'Lk 1:26-38' },
    { title: 'The Visitation', meditation: 'Elizabeth rejoices; we serve with joy.', scriptureRef: 'Lk 1:39-56' },
    { title: 'The Nativity', meditation: 'Christ is born in poverty—embrace simplicity.', scriptureRef: 'Lk 2:1-20' },
    { title: 'The Presentation', meditation: 'Jesus is offered to the Father; we offer our lives.', scriptureRef: 'Lk 2:22-38' },
    { title: 'Finding in the Temple', meditation: 'Seek Jesus diligently; find Him in the Father’s house.', scriptureRef: 'Lk 2:41-52' },
  ],
  Sorrowful: [
    { title: 'Agony in the Garden', meditation: 'Stay with Jesus in His hour of trial.', scriptureRef: 'Mt 26:36-46' },
    { title: 'Scourging at the Pillar', meditation: 'He bears wounds for our healing.', scriptureRef: 'Jn 19:1' },
    { title: 'Crowning with Thorns', meditation: 'The King embraces mockery to redeem pride.', scriptureRef: 'Mt 27:27-31' },
    { title: 'Carrying of the Cross', meditation: 'Take up your cross daily and follow Him.', scriptureRef: 'Lk 23:26-32' },
    { title: 'Crucifixion', meditation: 'Love to the end; mercy flows from the Cross.', scriptureRef: 'Lk 23:33-49' },
  ],
  Glorious: [
    { title: 'Resurrection', meditation: 'Christ is risen; hope prevails.', scriptureRef: 'Mt 28' },
    { title: 'Ascension', meditation: 'Our homeland is in heaven.', scriptureRef: 'Acts 1:6-11' },
    { title: 'Descent of the Spirit', meditation: 'Come, Holy Spirit—ignite the Church.', scriptureRef: 'Acts 2' },
    { title: 'Assumption of Mary', meditation: 'Mary shares in her Son’s victory.', scriptureRef: '' },
    { title: 'Coronation of Mary', meditation: 'Queen of Heaven, lead us to Jesus.', scriptureRef: '' },
  ],
  Luminous: [
    { title: 'Baptism in the Jordan', meditation: 'Beloved children in the Son.', scriptureRef: 'Mt 3:13-17' },
    { title: 'Wedding at Cana', meditation: 'Do whatever He tells you.', scriptureRef: 'Jn 2:1-12' },
    { title: 'Proclamation of the Kingdom', meditation: 'Repent, believe, and live the Beatitudes.', scriptureRef: 'Mk 1:14-15' },
    { title: 'Transfiguration', meditation: 'Listen to Him—the Beloved Son.', scriptureRef: 'Lk 9:28-36' },
    { title: 'Institution of the Eucharist', meditation: 'This is my Body—love poured out.', scriptureRef: 'Lk 22:14-20' },
  ],
}

export function rosarySetForDate(d: Date): RosarySet {
  const day = d.getDay() // 0 Sun - 6 Sat
  switch (day) {
    case 0:
      return 'Glorious'
    case 1:
      return 'Joyful'
    case 2:
      return 'Sorrowful'
    case 3:
      return 'Glorious'
    case 4:
      return 'Luminous'
    case 5:
      return 'Sorrowful'
    case 6:
    default:
      return 'Joyful'
  }
}

export function rosaryForDate(d: Date) {
  const set = rosarySetForDate(d)
  return { set, items: sets[set] }
}
