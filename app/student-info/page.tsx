'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { db } from '@/app/firebase'; // Make sure to create this file to initialize Firebase
import { collection, addDoc } from 'firebase/firestore';

export default function StudentInfo() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [program, setProgram] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [clubName, setClubName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "students"), {
        name,
        gender,
        program,
        semester,
        section,
        clubName,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      // Clear form fields after successful submission
      setName('');
      setGender('');
      setProgram('');
      setSemester('');
      setSection('');
      setClubName('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px]">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Student Information</CardTitle>
          <CardDescription className="text-lg">Please enter your details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mb-4"
            />
            <Input 
              type="text" 
              placeholder="Gender" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className="mb-4"
            />
            <Input 
              type="text" 
              placeholder="Program" 
              value={program} 
              onChange={(e) => setProgram(e.target.value)} 
              className="mb-4"
            />
            <Input 
              type="text" 
              placeholder="Semester" 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)} 
              className="mb-4"
            />
            <Input 
              type="text" 
              placeholder="Section" 
              value={section} 
              onChange={(e) => setSection(e.target.value)} 
              className="mb-4"
            />
            <Input 
              type="text" 
              placeholder="Club Name/House Name" 
              value={clubName} 
              onChange={(e) => setClubName(e.target.value)} 
              className="mb-4"
            />
            <Button type="submit" className="w-full text-lg py-2">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}