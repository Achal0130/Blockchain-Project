// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// describe("MedicalRecords", () => {
//   let user1, medical, transactionResponse, transactionReceipt;
//   beforeEach(async () => {
//     const account = await ethers.getSigners();
//     user1 = account[1];
//     const Medical = await ethers.getContractFactory("MedicalRecords");
//     medical = await Medical.connect(user1).deploy();
//   });
//   describe("Deployment", () => {
//     it("The contract is deployed successfully", async () => {
//       expect(await medical.address).to.not.equal(0);
//     });
//   });
//   describe("Add Record", () => {
//     beforeEach(async () => {
//       transactionResponse = await medical.addRecord(
//         "Wastron",
//         22,
//         "Male",
//         "B positive",
//         "Dengue",
//         "Dengue",
//         "Dengue"
//       );
//       transactionReceipt = await transactionResponse.wait();
//     });
//     it("Emits a Add Record event", async () => {
//       const event = await transactionReceipt.events[0];
//       expect(event.event).to.equal("MedicalRecords__AddRecord");
//       const args = event.args;
//       expect(args.timestamp).to.not.equal(0);
//       expect(args.name).to.equal("Wastron");
//       expect(args.age).to.equal(22);
//       expect(args.gender).to.equal("Male");
//       expect(args.bloodType).to.equal("B positive");
//       expect(args.allergies).to.equal("Dengue");
//       expect(args.diagnosis).to.equal("Dengue");
//       expect(args.treatment).to.equal("Dengue");
//     });
//     it("The getRecords function is working", async () => {
//       const [
//         timestamp,
//         name,
//         age,
//         gender,
//         bloodType,
//         allergies,
//         diagnosis,
//         treatment,
//       ] = await medical.getRecord(await medical.getRecordId());
//       expect(await medical.getRecordId()).to.equal(1);
//       expect(timestamp).to.not.equal(0);
//       expect(name).to.equal("Wastron");
//       expect(age).to.equal(22);
//       expect(gender).to.equal("Male");
//       expect(bloodType).to.equal("B positive");
//       expect(allergies).to.equal("Dengue");
//       expect(diagnosis).to.equal("Dengue");
//       expect(treatment).to.equal("Dengue");
//     });
//   });

//   describe("The delete function is working", () => {
//     beforeEach(async () => {
//       transactionResponse = await medical.addRecord(
//         "Wastron",
//         22,
//         "Male",
//         "B positive",
//         "Dengue",
//         "Dengue",
//         "Dengue"
//       );
//       transactionReceipt = await transactionResponse.wait();
//       transactionResponse = await medical.deleteRecord(1);
//       transactionReceipt = await transactionResponse.wait();
//     });
//     it("The record is deleted ", async () => {
//       expect(await medical.getDeleted(1)).to.be.equal(true);
//     });
//     it("Emits a delete event", async () => {
//       const event = await transactionReceipt.events[0];
//       const args = event.args;
//       expect(event.event).to.equal("MedicalRecords__DeleteRecord");
//       expect(args.timestamp).to.not.equal(0);
//       expect(args.name).to.equal("Wastron");
//       expect(args.age).to.equal(22);
//       expect(args.gender).to.equal("Male");
//       expect(args.bloodType).to.equal("B positive");
//       expect(args.allergies).to.equal("Dengue");
//       expect(args.diagnosis).to.equal("Dengue");
//       expect(args.treatment).to.equal("Dengue");
//     });
//   });
// });

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecords", () => {
    let user1, medical, transactionResponse, transactionReceipt;

    beforeEach(async() => {
        const accounts = await ethers.getSigners();
        user1 = accounts[1];
        const Medical = await ethers.getContractFactory("MedicalRecords");
        medical = await Medical.connect(user1).deploy();
    });

    describe("Deployment", () => {
        it("should deploy the contract successfully", async() => {
            expect(await medical.address).to.not.equal(0);
        });
    });

    describe("Add Record", () => {
        beforeEach(async() => {
            transactionResponse = await medical.addRecord(
                "Wastron",
                22,
                "Male",
                "B positive",
                "Dengue",
                "Dengue",
                "Dengue"
            );
            transactionReceipt = await transactionResponse.wait();
        });

        it("should emit an Add Record event", async() => {
            const event = transactionReceipt.events ? .find(e => e.event === "MedicalRecords__AddRecord");
            expect(event).to.not.be.undefined; // Check if event exists
            if (event) {
                const args = event.args;
                expect(args.timestamp).to.not.equal(0);
                expect(args.name).to.equal("Wastron");
                expect(args.age).to.equal(22);
                expect(args.gender).to.equal("Male");
                expect(args.bloodType).to.equal("B positive");
                expect(args.allergies).to.equal("Dengue");
                expect(args.diagnosis).to.equal("Dengue");
                expect(args.treatment).to.equal("Dengue");
            }
        });

        it("should retrieve the added record correctly", async() => {
            const recordId = await medical.getRecordId();
            const [
                timestamp,
                name,
                age,
                gender,
                bloodType,
                allergies,
                diagnosis,
                treatment,
            ] = await medical.getRecord(recordId);

            expect(recordId).to.equal(1);
            expect(timestamp).to.not.equal(0);
            expect(name).to.equal("Wastron");
            expect(age).to.equal(22);
            expect(gender).to.equal("Male");
            expect(bloodType).to.equal("B positive");
            expect(allergies).to.equal("Dengue");
            expect(diagnosis).to.equal("Dengue");
            expect(treatment).to.equal("Dengue");
        });
    });

    describe("Delete Functionality", () => {
        beforeEach(async() => {
            transactionResponse = await medical.addRecord(
                "Wastron",
                22,
                "Male",
                "B positive",
                "Dengue",
                "Dengue",
                "Dengue"
            );
            transactionReceipt = await transactionResponse.wait();

            // Delete the record
            transactionResponse = await medical.deleteRecord(1);
            transactionReceipt = await transactionResponse.wait();
        });

        it("should mark the record as deleted", async() => {
            expect(await medical.getDeleted(1)).to.be.true;
        });

        it("should emit a Delete Record event", async() => {
            const event = transactionReceipt.events ? .find(e => e.event === "MedicalRecords__DeleteRecord");
            expect(event).to.not.be.undefined; // Check if event exists
            if (event) {
                const args = event.args;
                expect(args.timestamp).to.not.equal(0);
                expect(args.name).to.equal("Wastron"); // Assuming you want to check this
                expect(args.age).to.equal(22); // Assuming you want to check this
                expect(args.gender).to.equal("Male"); // Assuming you want to check this
                expect(args.bloodType).to.equal("B positive"); // Assuming you want to check this
                expect(args.allergies).to.equal("Dengue"); // Assuming you want to check this
                expect(args.diagnosis).to.equal("Dengue"); // Assuming you want to check this
                expect(args.treatment).to.equal("Dengue"); // Assuming you want to check this
            }
        });
    });
});