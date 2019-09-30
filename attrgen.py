import sys,json
from MathABS import ABS
from charm.toolbox.pairinggroup import PairingGroup

def main():
    group = PairingGroup('MNT159')
    absinst = ABS(group)
    data = json.load(sys.stdin.readline())
    ask = absinst.decodestr(data['ask'])
    ska = absinst.generateattributes(ask,['HRD','SCHIEF'])
    response = {"ska":absinst.encodestr(ska)}
    print(json.dumps(response))

if __name__ == "__main__":
    main()