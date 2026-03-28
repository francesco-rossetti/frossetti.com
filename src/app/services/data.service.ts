import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { Skill } from '../models/skill.model';
import { Experience } from '../models/experience.model';
import { Education } from '../models/education.model';
import { Certification } from '../models/certification.model';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  private cache = new Map<string, Observable<any>>();

  private loadJson<T>(path: string, key: string): Observable<T[]> {
    if (!this.cache.has(path)) {
      this.cache.set(
        path,
        this.http.get<Record<string, T[]>>(`/assets/domain/data/${path}`).pipe(
          map((data) => data[key]),
          shareReplay(1)
        )
      );
    }
    return this.cache.get(path)!;
  }

  getSkills(): Observable<Skill[]> {
    return this.loadJson<Skill>('skill.json', 'skill');
  }

  getExperiences(): Observable<Experience[]> {
    return this.loadJson<Experience>('experience.json', 'experience');
  }

  getEducation(): Observable<Education[]> {
    return this.loadJson<Education>('education.json', 'education');
  }

  getCertifications(): Observable<Certification[]> {
    return this.loadJson<Certification>('certification.json', 'certification');
  }

  getProjects(): Observable<Project[]> {
    return this.loadJson<Project>('project.json', 'project');
  }
}
