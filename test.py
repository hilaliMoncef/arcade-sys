import subprocess
import sys


def main():
    p = subprocess.Popen(["PayterPay.exe", "--url=192.168.1.44:3183", "--amount=100"], shell=True, stdout=subprocess.PIPE)
    out, err = p.communicate()
    print(p.poll())
    while p.poll() is None:
        if "APPROVED" in out.decode("utf-8") :
            print("OK\n")
            sys.stdout.flush()
            break
        elif "DECLINED" in out.decode("utf-8") :
            print("ERR\n")
            sys.stdout.flush()
            break
        

if __name__== '__main__':
    main()