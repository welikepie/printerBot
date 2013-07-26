from Adafruit_Thermal import * 
from PIL import Image 
from array import array
import time, shutil, os, math 
printer = Adafruit_Thermal("/dev/ttyAMA0",19200,timeout=5)

img = Image.open('nodeImages/0.png');
printer.printImage(img, True);

def HexToByte( hexStr ):
    """
    Convert a string hex byte values into a byte string. The Hex Byte values may
    or may not be space separated.
    """
    # The list comprehension implementation is fractionally slower in this case    
    #
    #    hexStr = ''.join( hexStr.split(" ") )
    #    return ''.join( ["%c" % chr( int ( hexStr[i:i+2],16 ) ) \
    #                                   for i in range(0, len( hexStr ), 2) ] )
 
    bytes = []

    hexStr = ''.join( hexStr.split(" ") )

    for i in range(0, len(hexStr), 2):
        bytes.append( chr( int (hexStr[i:i+2], 16 ) ) )

    return ''.join( bytes )


while 1:
    time.sleep(5);
    if len(os.listdir("nodeImages")) > 0:
       # for x in range(0,len(os.listdir("nodeImages"))):
       for x in range(0,1):
	    #print os.listdir("img")[x]
            if os.path.isfile("nodeImages/"+os.listdir("nodeImages")[x]):
                print os.listdir("nodeImages")[x]
                #print 'img/'+os.listdir("img")[x]
		im = Image.open("nodeImages/"+os.listdir("nodeImages")[x]);
		const = im.size[0]/384.0
		width = int(math.ceil(im.size[0]/math.ceil(const)))
		height = int(math.ceil(im.size[1]/math.ceil(const)))
		rgb_im = im.convert('RGB');
		array = []
		for xcord in range(0,width):
		    for ycord in range(0,height):
			r, g, b = rgb_im.getpixel((xcord*math.ceil(const),ycord*math.ceil(const)));
			array.append( HexToByte( hex( int( math.floor((r+g+b)/3.0) ) ).lstrip("0x") ) )
		print array
		printer.printBitmap(width,height,array);
		
		os.renames('nodeImages/'+os.listdir("img")[x],'nodeImages/printed/'+os.listdir("nodeImages")[x])
                print "moved"
    if len(os.listdir("nodeImages/printed"))>50:
        for y in range(0,len(os.listdir("nodeImages/printed"))):
            os.remove(os.listdir("nodeImages/printed")[y]);



