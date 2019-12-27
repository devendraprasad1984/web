length = 2
width = 4
perim = 2 * (length + width)
area = length * width
number = 23

def func1():
    print("Hello World!!")
    print("The Area is: ", area)
    print("The Perimeter is: ", perim)
    
    guess = 22 #raw_input("Enter an integer : ")
    print("You have entered: ", guess)
pass

def testParam(initial=5, *numbers, **keywords):
    count = initial
    for number in numbers:
        count += number
    for key in keywords:
        count += keywords[key]
    return count
pass

def testList():
    shoplist = ['apple', 'mango', 'carrot', 'banana']
    print ("I have", len(shoplist), "items to purchase.")
    print ("These items are:")
    for item in shoplist:
        print (item)
    shoplist.append("ginger")
    shoplist.sort()
    print("The new items are: ",shoplist)
pass

def dictTest():
    arrEmail={
        "devendra":"devendra@gmail.com"
        ,"raman":"raman@gmail.com"
        ,"kittu":"kittu@gmail.com"
        ,"dolly":"dolly@gmail.com"
        ,"ravi":"ravi@gmail.com"
    }
    print("Email for dolly is: ", arrEmail["dolly"])
    arrEmail['Guido'] = 'guido@python.org'
    
    for key, val in arrEmail.items():
        #print("contact {} at {}".format(key, val))
        print (key, val)
pass

def testSet():
    bri = set(['brazil', 'russia', 'india'])
    print("is india in country list: ",('india' in bri))
    bri.add('china')
    print(bri)
    delimiter = '_*_'
    print(delimiter.join(bri))
pass