import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCampaignsComponent } from './add-campaigns/add-campaigns.component';
import { UpdateCampaignsComponent } from './update-campaigns/update-campaigns.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Campaign } from '../../core/models';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CampaignsComponent implements OnInit {
  @ViewChild('sortDropdown') sortDropdown!: ElementRef;
  
  showSortDropdown = false;
  selectedSortLabel = 'Sıralama';
  
  campaigns: Campaign[] = [];
  originalCampaigns: Campaign[] = [];
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    this.campaigns = campaigns;
    this.originalCampaigns = [...campaigns];
  }

  getOriginalIndex(campaign: Campaign): number {
    return this.originalCampaigns.findIndex(c => 
      c.name === campaign.name && 
      c.createdAt === campaign.createdAt
    );
  }

  showMessage(message: string) {
    this.successMessage = message;
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.successMessage = '';
    }, 3000);
  }

  openAddCampaignModal() {
    const modalRef = this.modalService.open(AddCampaignsComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      fullscreen: false,
      windowClass: 'modal',
      modalDialogClass: 'campaign-modal',
      animation: true
    });

    modalRef.closed.subscribe((result) => {
      if (result) {
        this.loadCampaigns();
        this.showMessage('Kampanya başarılı bir şekilde eklenmiştir');
      }
    });
  }

  openUpdateCampaignModal(campaign: Campaign, index: number) {
    const modalRef = this.modalService.open(UpdateCampaignsComponent, {
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.campaign = campaign;
    modalRef.componentInstance.index = index;

    modalRef.closed.subscribe((result: any) => {
      if (result?.deleted) {
        const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
        campaigns.splice(result.index, 1);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        this.loadCampaigns();
        this.showMessage('Kampanya başarılı bir şekilde silinmiştir');
      } else if (result?.updated) {
        const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
        campaigns[result.index] = result.campaign;
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        this.loadCampaigns();
        this.showMessage('Kampanya başarılı bir şekilde güncellenmiştir');
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async deleteCampaign(index: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'sm'
    });

    modalRef.componentInstance.title = 'Kampanya Sil';
    modalRef.componentInstance.message = 'Bu kampanyayı silmek istediğinizden emin misiniz?';

    try {
      const result = await modalRef.closed.toPromise();
      if (result) {
        const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
        campaigns.splice(index, 1);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        this.loadCampaigns();
        this.showMessage('Kampanya başarılı bir şekilde silinmiştir');
      }
    } catch (err) { }
  }

  toggleSortDropdown(event: Event) {
    event.stopPropagation();
    this.showSortDropdown = !this.showSortDropdown;
  }

  onSortSelect(value: string) {
    const [type, order] = value.split('_');
    
    switch(value) {
      case 'points_desc':
        this.selectedSortLabel = 'Puan (Yüksek → Düşük)';
        break;
      case 'points_asc':
        this.selectedSortLabel = 'Puan (Düşük → Yüksek)';
        break;
      case 'date_desc':
        this.selectedSortLabel = 'Tarih (Yeni → Eski)';
        break;
      case 'date_asc':
        this.selectedSortLabel = 'Tarih (Eski → Yeni)';
        break;
      default:
        this.selectedSortLabel = 'Sıralama';
    }

    this.campaigns.sort((a, b) => {
      if (type === 'points') {
        return order === 'asc' ? a.points - b.points : b.points - a.points;
      } else {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });

    this.showSortDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.sortDropdown && !this.sortDropdown.nativeElement.contains(event.target)) {
      this.showSortDropdown = false;
    }
  }
}