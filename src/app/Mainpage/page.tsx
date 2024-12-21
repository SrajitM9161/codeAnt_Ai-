'use client';

import React, { useState } from 'react';
import { Search, RefreshCw, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from '../Components/Sidebar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Repository {
  id: number;
  name: string;
  language: string;
  size: string;
  lastUpdated: string;
  isPrivate: boolean;
}

interface PageNumber {
  value: number | string;
  type: 'number' | 'ellipsis';
}

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const repositories: Repository[] = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Repository-${index + 1}`,
    language: ['React', 'TypeScript', 'JavaScript', 'Python'][Math.floor(Math.random() * 4)],
    size: `${Math.floor(Math.random() * 1000)}KB`,
    lastUpdated: `${Math.floor(Math.random() * 30)} days ago`,
    isPrivate: Math.random() > 0.5
  }));


  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = (): PageNumber[] => {
    const pageNumbers: PageNumber[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => ({
        value: i + 1,
        type: 'number'
      }));
    }

    pageNumbers.push({ value: 1, type: 'number' });
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 2) {
      end = Math.min(totalPages - 1, 4);
    } else if (currentPage >= totalPages - 1) {
      start = Math.max(2, totalPages - 3);
    }

    if (start > 2) pageNumbers.push({ value: '...', type: 'ellipsis' });
    for (let i = start; i <= end; i++) {
      pageNumbers.push({ value: i, type: 'number' });
    }
    if (end < totalPages - 1) pageNumbers.push({ value: '...', type: 'ellipsis' });
    pageNumbers.push({ value: totalPages, type: 'number' });

    return pageNumbers;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 w-full">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h1 className="text-2xl font-semibold">Repositories</h1>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh All
                </Button>
                <Button size="sm" className="whitespace-nowrap">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Repository
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm text-gray-600">
                Total repositories: {repositories.length}
              </div>
              
              <div className="w-full max-w-[366px]">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search repositories..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 pr-4 h-[44px] w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 mb-6 border rounded-lg bg-white overflow-hidden">
            {paginatedRepos.length > 0 ? (
              paginatedRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="p-4 border-b last:border-none hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer">
                        {repo.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {repo.language}
                        </span>
                        <span>{repo.size}</span>
                        <span>Updated {repo.lastUpdated}</span>
                        {repo.isPrivate && (
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No repositories found matching your search.
              </div>
            )}
          </div>
          {filteredRepos.length > itemsPerPage && (
            <div className="overflow-x-auto">
              <Pagination>
                <PaginationContent className="flex-wrap justify-center">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((pageNum, index) => (
                    <PaginationItem key={index}>
                      {pageNum.type === 'ellipsis' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => setCurrentPage(Number(pageNum.value))}
                          isActive={currentPage === pageNum.value}
                          className="cursor-pointer"
                        >
                          {pageNum.value}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryList;