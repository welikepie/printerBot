from Adafruit_Thermal import * 
from PIL import Image 
from array import array
import time, shutil, os, math 
printer = Adafruit_Thermal("/dev/ttyAMA0",19200,timeout=5)

#img = Image.open('nodeImages/0.png');
#printer.printImage(img, True);
#basewidth = 400;

#img = Image.open('01.jpeg');
#wpercent = (basewidth/float(img.size[0]));
#hsize = int((float(img.size[1])*float(wpercent)));
#img = img.resize((basewidth,hsize));
#printer.printImage(img, True);

while 1:
    time.sleep(2.5);
    listDir = os.listdir("nodeImages")
    remArr = array();
    if len(listDir) > 0:
        for x in range(0,len(listDir)):
       #for x in range(0,1):
	    #print os.listdir("img")[x]
            if os.path.isfile("nodeImages/"+listDir[x]):
                print os.listdir("nodeImages")[x]
                basewidth = 400;
                img = Image.open("nodeImages/"+listDir[x]);
                wpercent = (basewidth/float(img.size[0]));
                hsize = int((float(img.size[1])*float(wpercent)));
                img = img.resize((basewidth,hsize));
                printer.printImage(img, True);
                printer.feed(2);
                print 'nodeImages/'+listDir[x]
                #printer.printBitmap(width,height,array);
                #os.renames('nodeImages/'+os.listdir("img")[x],'nodeImages/printed/'+os.listdir("nodeImages")[x])
                #       print "moved"
        for y in range(0,len(listDir)):
            print y
            print 'nodeImages/'+listDir[y]
            os.remove('nodeImages/'+listDir[y]);
            



