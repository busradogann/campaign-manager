import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Campaign } from '../../../core/models';

@Component({
  selector: 'app-add-campaigns',
  templateUrl: './add-campaigns.component.html',
  styleUrls: ['./add-campaigns.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddCampaignsComponent {
  campaignForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {
    this.campaignForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      points: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const currentDate = new Date().toISOString();
      const campaign: Campaign = {
        ...this.campaignForm.value,
        createdAt: currentDate,
        updatedAt: currentDate
      };

      const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      existingCampaigns.push(campaign);
      localStorage.setItem('campaigns', JSON.stringify(existingCampaigns));

      this.modal.close(campaign);
    } else {
      Object.keys(this.campaignForm.controls).forEach(key => {
        const control = this.campaignForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  increasePoints() {
    const currentValue = this.campaignForm.get('points')?.value || 0;
    this.campaignForm.patchValue({
      points: currentValue + 1
    });
  }

  decreasePoints() {
    const currentValue = this.campaignForm.get('points')?.value || 0;
    if (currentValue > 0) {
      this.campaignForm.patchValue({
        points: currentValue - 1
      });
    }
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
} 