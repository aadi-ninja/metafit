Hey Guys for Yall wondering how i got the vapi voice gent working in webcall, I,ve broken it down below..

1.Initially i was stuk with workflows cannot be integrated with webcall problem. So i switched to vapi assistants. HERE ME OUT!
2.This was my system prompt(You are a friendly AI fitness coach named CodeFlex AI. 
          Greet the user warmly at the start of the conversation.
          
          Your goal is to collect the following information through natural conversation:
          - Age (number)
          - Height (e.g., "5'10\"" or in cm)
          - Weight (e.g., "170 lbs" or in kg)
          - Any injuries or limitations (string, e.g., "knee pain" or "none")
          - Available workout days per week (number, e.g., 4)
          - Fitness goal (choose from: weight_loss, muscle_gain, endurance, general_fitness, strength)
          - Fitness level (choose from: beginner, intermediate, advanced)
          - Dietary restrictions (e.g., "vegetarian", "none")
          
          Rules:
          1. Ask **one question at a time**. 
          2. Confirm the user’s response at the end of conversation
          3. Be empathetic and supportive during the conversation. 
          4. Do **not** mention or use internal variables like user IDs or names. 
          5. end the call after the user confirms there is no changes by thank you ! you will be redirected to your profile to view the plan)

3. Then i create a custom tool with
   a)toolname = collectUserDetails
   b)description = Collects user fitness profile details for generating a personalized workout and diet plan.
   c)Parameters = {
                  "type": "object",
                  "properties": {
                    "age": {
                      "description": "User's age in years",
                      "type": "number"
                    },
                    "height": {
                      "description": "User's height, either in cm or ft/in format",
                      "type": "string"
                    },
                    "weight": {
                      "description": "User's weight, either in kg or lbs",
                      "type": "string"
                    },
                    "fitness_goal": {
                      "description": "Primary fitness goal of the user",
                      "type": "string",
                      "enum": [
                        "weight_loss",
                        "muscle_gain",
                        "endurance",
                        "general_fitness",
                        "strength"
                      ]
                    },
                    "fitness_level": {
                      "description": "User's current fitness experience level",
                      "type": "string",
                      "enum": [
                        "beginner",
                        "intermediate",
                        "advanced"
                      ]
                    },
                    "dietary_restrictions": {
                      "description": "Any dietary restrictions, e.g., vegetarian, vegan, none",
                      "type": "string"
                    },
                    "injuries_limitations": {
                      "description": "Any injuries or physical limitations the user has, or 'none'",
                      "type": "string"
                    },
                    "workout_days_per_week": {
                      "description": "Number of days per week the user is available for workouts",
                      "type": "number"
                    }
                  },
                  "required": [
                    "age",
                    "height",
                    "weight",
                    "injuries_limitations",
                    "workout_days_per_week",
                    "fitness_goal",
                    "fitness_level",
                    "dietary_restrictions"
                  ]
                }

4.Gave my server url by combining my convex url and generate-program page (it should be like follows - https:/dbname.convex.site/vapi/generate-program.
5. I coded it in a way that the assistant will give me response in json to my backend and then the plans get generated from gemini api .
6. the userid and username will be concatenated with response and saved in the convex db.


THATS IT!!  PLEASE LEAVE A STAR 💖
