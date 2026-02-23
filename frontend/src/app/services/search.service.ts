import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SearchService {
  searchParams = signal<{searchTerm: string, searchBy: 'name' | 'type'} | null> (null);

  triggerSearch(params: {searchTerm: string, searchBy: 'name' | 'type'}) {
    this.searchParams.set(params);
  }

  resetSearch() {
    this.searchParams.set(null);
  }
}
