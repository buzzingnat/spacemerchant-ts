[
  {
    "id": "firstEvent",
    "title": "Windfall Gains",
    "text": "<p>You have just completed a run with the merchant ship you've worked on for five years.This run was phenomenally succesful, and your captain has decided to retire while she's ahead.</p><p>You are now without a job and in a space station far from your home. To ease the sting of her crew's unexpected unemployment, every crewmember has been given a large sum of money, the \"extra's\" from the windfall earned on the last run. You know exactly what to do with your earnings: become captain of your own vessel and seek your own fortune in the depths of space.</p><p>In this small port, your options are limited. Which ship will you choose?</p>",
    "choices": [
      {
        "next": "worstShip",
        "cost": 40000
      },
      {
        "next": "bestShip",
        "cost": 90000
      }
    ]
  },
  {
    "id": "worstShip",
    "title": "The Worst Ship",
    "choices": [
      {
        "next": "crewHired"
      }
    ]
  },
  {
    "id": "bestShip",
    "title": "The Best Ship",
    "text": "<p>You manage to bargain the sale price down from impossibly high to uncomfortably high. You will be eating light until you earn some money. After one more exhaustive once-over of the ship, -- your ship, now! -- you plot a course through the next several way points toward your home planet and examine the markets to find cargo to haul.</p>",
    "choices": [
      {
        "next": "marketExcelsior",
        "text": "Check the markets and buy goods and supplies."
      }
    ]
  },
  {
    "id": "crewHired",
    "cost": 5000,
    "title": "Your crew so far",
    "choices": [
      {
        "next": "hireCargoMaster"
      },
      {
        "next": "hireDoctor"
      },
      {
        "next": "hireNavigator"
      },
      {
        "next": "marketExcelsior",
        "text": "Your crew looks good. Time to buy trade goods!"
      }
    ]
  },
  {
    "id": "hireNavigator",
    "title": "Hiring a Navigator",
    "cost": 10000,
    "choices": [
      {
        "next": "grouchyNavigator",
        "text": "Ask Dorothy to join you."
      },
      {
        "next": "ambitiousNavigator",
        "text": "Offer a position to Eugene."
      },
      {
        "next": "crewHired",
        "text": "Decide to spend your money on a different crewmember."
      }
    ]
  },
  {
    "id": "grouchyNavigator",
    "title": "An Experienced Navigator",
    "cost": 10000,
    "choices": [
      {
        "cost": 10000,
        "next": "crewHired"
      },
      {
        "next": "ambitiousNavigator",
        "text": "Turn her down, try asking the ambitious, young Eugene instead."
      },
      {
        "next": "crewHired",
        "text": "Decide to spend your money on a different crew position, or none at all."
      }
    ]
  }
]