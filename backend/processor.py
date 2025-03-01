from agents.chapters_agent import ChaptersAgent
from agents.quiz_agent import QuizAgent
from agents.slides_agent import SlideGenerator
from utils.process_outputs import process_outputs_from_yaml
import yaml

def process_pdf():
  print("Processor started")
  
  # define agents
  config_path = "configs/default.yaml"
  chapter_agent = ChaptersAgent(config_path)
  quiz_agent = QuizAgent(config_path)
  slide_agent = SlideGenerator(config_path)
  
  # run them
  print("Processing PDF...")
  try: chapter_agent.generate_chapters()
  except: pass
  try: quiz_agent.generate_chapter_quizzes()
  except: pass
  try: slide_agent.generate_slides()
  except: pass
  
  # load them
  result = process_outputs_from_yaml(config_path)
  
  return result["chapters"], result["quiz"], result["slides"]
