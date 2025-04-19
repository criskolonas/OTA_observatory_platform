import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HomeExploreOptionComponent } from './home-explore-option/home-explore-option.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, HomeExploreOptionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
