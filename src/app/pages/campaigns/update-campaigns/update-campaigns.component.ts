import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Campaign } from '../../../core/models';

@Component({
  selector: 'app-update-campaigns',
  templateUrl: './update-campaigns.component.html',
  styleUrls: ['./update-campaigns.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateCampaignsComponent {
  @Input() campaign!: Campaign;
  @Input() index!: number;
  campaignForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private modalService: NgbModal
  ) {
    this.campaignForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      points: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    if (this.campaign) {
      this.campaignForm.patchValue(this.campaign);
    }
  }

  async deleteCampaign() {
    const confirmRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: 'static'
    });

    confirmRef.componentInstance.title = 'Kampanya Sil';
    confirmRef.componentInstance.message = 'Bu kampanyayı silmek istediğinizden emin misiniz?';

    try {
      const result = await confirmRef.closed.toPromise();
      if (result) {
        this.modal.close({ deleted: true, index: this.index });
      }
    } catch (err) { }
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const updatedCampaign: Campaign = {
        ...this.campaign,
        ...this.campaignForm.value,
        updatedAt: new Date().toISOString()
      };

      this.modal.close({ updated: true, campaign: updatedCampaign, index: this.index });
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