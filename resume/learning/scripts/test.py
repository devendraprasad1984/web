#import sys
import os
from sys import argv
from sys import path
from math import sqrt

#import functions and variables from other file
from myMod import *


func1()
print ("Path is: ",path)
print ("Current Working Directory is: ",os.getcwd())
print (testParam(10, 1, 2, 3, vegetables=50, fruits=100))
testList()
dictTest()
testSet()