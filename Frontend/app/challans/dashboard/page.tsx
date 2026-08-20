'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  MapPin,
  Car,
  AlertTriangle,
  ExternalLink,
  Info,
  RefreshCw
} from 'lucide-react';
import challanApi from '@/services/challanApi';
import { ChallanInfo } from '@/types';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

const INDIAN_STATES = [
  'Bihar',
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Uttar Pradesh',
  'Gujarat',
  'West Bengal',
  'Andhra Pradesh',
  'Assam',
  'Goa',
  'Haryana',
  'Kerala',
  'Punjab',
  'Rajasthan',
  'Telangana'
];

export default function ChallansPage() {
  const [selectedState, setSelectedState] = useState<string>('Bihar');
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>('');
  const [fines, setFines] = useState<ChallanInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchChallanData = async () => {
    try {
      setIsLoading(true);
      setErrorMsg('');

      const response = await challanApi.getChallanInfoByState(selectedState, {
        vehicleType: vehicleTypeFilter || undefined
      });

      if (response && response.data) {
        setFines(response.data);
      } else {
        setFines([]);
      }
    } catch (err: any) {
      console.error('Fetch challan data error:', err);
      setErrorMsg(err.message || 'Unable to retrieve state challan rates.');
      setFines([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChallanData();
  }, [selectedState, vehicleTypeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fethChallanData();
  };