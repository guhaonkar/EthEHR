pragma solidity >=0.4.17 <0.7.0;

contract Maptest {
    address admin;
    address[] doctor;
    address[] patient;
    
    struct Patty{
        address[] pats;
    }
    
    mapping(address => Patty) docToPat;
    
    mapping(address => string) patToEHR;
    
    function Maptest() public {
        admin = msg.sender;
    }
    
    function getAdmin() public view returns (address) {
        return admin;
    }
    
    
    
    function addDoc(address newDocAddr) public onlyAdmin {
        doctor.push(newDocAddr);
    }
    
    function addPat(address newPatAddr) public onlyAdmin {
        patient.push(newPatAddr);
        patToEHR[newPatAddr] = 'NEW';
    }
    
    function assignDoc(address patAddr, address docAddr) public onlyAdmin {
        bool isValid = false;
        
        for (uint i = 0; i<doctor.length; i++) {
            if(docAddr == doctor[i]) {
                for(uint j = 0; j<patient.length; j++){
                    if(patient[j] == patAddr) {
                        isValid = true;
                    }
                }
            }
        }
        
        if(isValid) {
            docToPat[docAddr].pats.push(patAddr);
        }
    }
    
    
    
    function docList() public view returns (address[]) {
        return docToPat[msg.sender].pats;
    }
    
    function viewEHR() public view returns (string) {
        return patToEHR[msg.sender];
    }
    
    function updateEHR(address patAddr, string newEHR) public {
        for (uint i = 0; i<doctor.length; i++) {
            if(msg.sender == doctor[i]) {
                for(uint j = 0; j<docToPat[msg.sender].pats.length; j++){
                    if(docToPat[msg.sender].pats[j] == patAddr) {
                        patToEHR[patAddr] = newEHR;
                    }
                }
            }
        }
    }
    
    
    
    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }
    
}